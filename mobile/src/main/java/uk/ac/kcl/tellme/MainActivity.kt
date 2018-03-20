package uk.ac.kcl.tellme

import android.annotation.TargetApi
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.View
import com.google.firebase.messaging.FirebaseMessaging

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

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            createNotificationChannels()
        }
    }

    @TargetApi(Build.VERSION_CODES.O)
    private fun createNotificationChannels() {
        val mNotificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        val mChannel = NotificationChannel("announcements", "Announcements", NotificationManager.IMPORTANCE_LOW)
        mChannel.enableLights(true)
        mNotificationManager.createNotificationChannel(mChannel)
    }

    override fun onResume() {
        super.onResume()
        window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION or View.SYSTEM_UI_FLAG_FULLSCREEN
        FirebaseMessaging.getInstance().subscribeToTopic("announcements")
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
        handler?.handleInteractiveRequestRedirect(requestCode, resultCode, data)
        super.onActivityResult(requestCode, resultCode, data)
    }
}
