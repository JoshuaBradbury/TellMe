package uk.ac.kcl.tellme

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.design.widget.NavigationView
import android.support.v4.view.GravityCompat
import android.support.v7.app.ActionBarDrawerToggle
import android.support.v7.app.AlertDialog
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.support.v7.widget.Toolbar
import android.view.*
import android.widget.LinearLayout
import android.widget.RelativeLayout
import kotlinx.android.synthetic.main.activity_category.*


class CategoryActivity : AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_category)


        val mToolbar = findViewById<View>(R.id.toolbar) as Toolbar
        setSupportActionBar(mToolbar)


        val userName = intent.getStringExtra("user")

//        (findViewById<TextView>(R.id.user_name) as TextView).text = userName

        val toggle = ActionBarDrawerToggle(this, drawer_layout, mToolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close)
        drawer_layout.addDrawerListener(toggle)
        toggle.syncState()

        nav_view.setNavigationItemSelectedListener(this)



        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.setHomeAsUpIndicator(R.drawable.ic_menu)


        val courses : ArrayList<CourseInfo> = ArrayList<CourseInfo>()
        courses.add(CourseInfo("5CCS2EG", "@Dr Jeroen Keppens ", "Tuesday,Jan 2", "Major Project List has just been published. Click below to view kaats"))
        courses.add(CourseInfo("5CCS2EG", "@Dr Jeroen Keppens ", "Tuesday,Jan 2", "Major Project List has just been published. Click below to view kaats"))
        courses.add(CourseInfo("5CCS2OCS", "@Dr Amanda COles", "Monday, Jan 1", "Online quiz has been extended for 24 hours due to technical problems. New due date is Jan 13th"))
        courses.add(CourseInfo("5CCS2FC2", "Dr Christopher Hampson", "Thursday, Jan 4", "Your SGT has been rescheduled to this Monday, please do not attend your scheduled SGT slot" ))


        val rv1 = findViewById<View>(R.id.rv1) as RecyclerView

        val adapter = CourseAdapter(this,courses)
        rv1.adapter = adapter

        rv1.setHasFixedSize(true)
        rv1.layoutManager = LinearLayoutManager(this)


    }

    override fun onBackPressed() {

        if(drawer_layout.isDrawerOpen(GravityCompat.START)) {
            drawer_layout.closeDrawer(GravityCompat.START)
        } else {

            AlertDialog.Builder(this)
                    .setMessage("Are you sure you want to exit?")
                    .setCancelable(false)
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



    override fun onNavigationItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.all_courses -> {

            }

            R.id.fakecourse -> {


            }
            R.id.fakecourse1 -> {

            }
            R.id.fakecourse2 -> {

            }

        }




        drawer_layout.closeDrawer(GravityCompat.START)
        return true
    }




}
