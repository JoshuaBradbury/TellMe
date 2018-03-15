package uk.ac.kcl.tellme

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.content.Intent

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

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
        handler?.handleInteractiveRequestRedirect(requestCode, resultCode, data)
        super.onActivityResult(requestCode, resultCode, data)
    }
}
