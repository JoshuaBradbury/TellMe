package uk.ac.kcl.tellme

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import android.support.v7.app.AlertDialog
import android.util.Log


class CategoryActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_category)

        val userName = intent.getStringExtra("user")

        (findViewById<TextView>(R.id.user_name) as TextView).text = userName
    }

    override fun onBackPressed() {
        AlertDialog.Builder(this)
                .setMessage("Are you sure you want to exit?")
                .setCancelable(false)
                .setPositiveButton("Yes", { _, _ -> exit() })
                .setNegativeButton("No", null)
                .show()
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
}
