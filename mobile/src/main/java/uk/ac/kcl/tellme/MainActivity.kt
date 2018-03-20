package uk.ac.kcl.tellme

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.content.Intent
import android.view.View

class MainActivity : AppCompatActivity() {

    val TAG = MainActivity::class.simpleName
    private var handler: MSALHandler? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        handler = MSALHandler(applicationContext, this)

        val action = intent.getSerializableExtra("action")

        when (action) {
            MSALAction.LOGOUT -> {
                handler?.logout()
                handler?.login()
            }
            MSALAction.EXIT -> finish()
            else -> handler?.login()
        }
    }

    override fun onResume() {
        super.onResume()
        window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION or View.SYSTEM_UI_FLAG_FULLSCREEN
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
        handler?.handleInteractiveRequestRedirect(requestCode, resultCode, data)
        super.onActivityResult(requestCode, resultCode, data)
    }
}
