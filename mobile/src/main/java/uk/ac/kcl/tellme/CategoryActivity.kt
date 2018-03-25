package uk.ac.kcl.tellme

import android.annotation.SuppressLint
import android.content.Intent
import android.os.AsyncTask
import android.os.Bundle
import android.support.design.widget.NavigationView
import android.support.v4.view.GravityCompat
import android.support.v7.app.ActionBarDrawerToggle
import android.support.v7.app.AlertDialog
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.support.v7.widget.Toolbar
import android.text.Layout
import android.text.SpannableString
import android.text.style.AlignmentSpan
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.TextView
import kotlinx.android.synthetic.main.activity_category.*
import uk.ac.kcl.tellme.api.Announcement
import uk.ac.kcl.tellme.api.getAllGroups
import uk.ac.kcl.tellme.api.getAnnouncements
import uk.ac.kcl.tellme.api.groups
import android.preference.PreferenceManager

class CategoryActivity : AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_category)

        val toolbar = findViewById<Toolbar>(R.id.toolbar)
        toolbar.hideOverflowMenu()
        setSupportActionBar(toolbar)

        val toggle = ActionBarDrawerToggle(this, drawerLayout, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close)
        drawerLayout.addDrawerListener(toggle)
        toggle.syncState()

        nav_view.setNavigationItemSelectedListener(this)

        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.setHomeAsUpIndicator(R.drawable.ic_menu)

        val rv1 = findViewById<RecyclerView>(R.id.rv1)

        rv1.setHasFixedSize(true)
        rv1.layoutManager = LinearLayoutManager(this)

        val navigationView = findViewById<NavigationView>(R.id.nav_view)

        updateGroups {
            for (group in 0 until groups.size) {
                navigationView.menu.add(Menu.NONE, group, Menu.NONE, "")
                val item = navigationView.menu.getItem(group)
                val s = SpannableString(groups[group].name)

                s.setSpan(AlignmentSpan.Standard(Layout.Alignment.ALIGN_CENTER), 0, s.length, 0)

                item.title = s
            }

            val groupId = intent.getIntExtra("groupId", -1)

            if (groupId >= 0) {
                for (id in 0 until groups.size) {
                    if (groups[id].id == groupId) {
                        navigationView.menu.performIdentifierAction(id, 0)
                        break
                    }
                }
            } else {
                navigationView.menu.performIdentifierAction(0, 0)
            }
        }
    }

    private fun updateGroups(func: () -> Unit) {
        val task = @SuppressLint("StaticFieldLeak")
        object : AsyncTask<Void, Void, Boolean>() {
            override fun doInBackground(vararg params: Void?): Boolean {
                return getAllGroups(PreferenceManager.getDefaultSharedPreferences(applicationContext).getString("user", ""))
            }

            override fun onPostExecute(result: Boolean?) {
                super.onPostExecute(result)
                if (!result!!) {
                    AlertDialog.Builder(this@CategoryActivity, R.style.AlertMenu)
                               .setMessage("Sorry we are unable to connect at this time")
                               .setCancelable(true)
                               .setPositiveButton("Retry", { diag, _ -> diag.cancel() })
                               .setOnCancelListener { _ -> updateGroups(func) }
                               .show()
                } else {
                    func()
                }
            }
        }
        task.execute()
    }

    override fun onBackPressed() {
        if (drawerLayout.isDrawerOpen(GravityCompat.START)) {
            drawerLayout.closeDrawer(GravityCompat.START)
        } else {
            AlertDialog.Builder(this, R.style.AlertMenu)
                       .setMessage("Are you sure you want to exit?")
                       .setCancelable(true)
                       .setPositiveButton("Yes", { _, _ -> exit() })
                       .setNegativeButton("No", null)
                       .show()
        }
    }

    private fun logout() {
        val intent = Intent(this, MainActivity::class.java).apply {
            putExtra("action", MSALAction.LOGOUT)
        }
        intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP

        startActivity(intent)
    }

    private fun exit() {
        val intent = Intent(this, MainActivity::class.java).apply {
            putExtra("action", MSALAction.EXIT)
        }
        intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP

        startActivity(intent)
    }

    fun promptLogOut(view: View) {
        AlertDialog.Builder(view.context, R.style.AlertMenu)
                   .setMessage("Are you sure you want to log out?")
                   .setCancelable(true)
                   .setPositiveButton("Yes", { _, _ -> logout() })
                   .setNegativeButton("Cancel", null)
                   .show()
    }

    override fun onNavigationItemSelected(item: MenuItem): Boolean {
        val task = @SuppressLint("StaticFieldLeak")
        object : AsyncTask<Void, Void, List<Announcement>>() {
            override fun doInBackground(vararg params: Void?): List<Announcement> {
                return getAnnouncements(groups[item.itemId].id, -1, PreferenceManager.getDefaultSharedPreferences(applicationContext).getString("user", ""))
            }

            override fun onPostExecute(result: List<Announcement>?) {
                super.onPostExecute(result)
                if (result!![0].id == -1) {
                    AlertDialog.Builder(this@CategoryActivity, R.style.AlertMenu)
                               .setMessage("Sorry we are unable to connect at this time")
                               .setCancelable(true)
                               .setPositiveButton("Retry", { diag, _ -> diag.cancel() })
                               .setOnCancelListener { _ -> onNavigationItemSelected(item) }
                               .show()
                } else {
                    val rv1 = findViewById<RecyclerView>(R.id.rv1)
                    rv1.adapter = AnnouncementAdapter(result)

                    findViewById<TextView>(R.id.toolbar_title).text = groups[item.itemId].name
                }
            }
        }
        task.execute()

        drawerLayout.closeDrawer(GravityCompat.START)
        return true
    }
}
