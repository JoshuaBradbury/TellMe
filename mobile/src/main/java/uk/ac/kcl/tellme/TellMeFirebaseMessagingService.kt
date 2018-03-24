package uk.ac.kcl.tellme

import android.app.job.JobInfo
import android.app.job.JobScheduler
import android.content.ComponentName
import android.content.Context
import android.os.PersistableBundle
import android.util.Log
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class TellMeFirebaseMessagingService: FirebaseMessagingService() {

    private var jobId = 0

    override fun onMessageReceived(remoteMessage: RemoteMessage?) {
        Log.d(MainActivity::class.simpleName, "RECEIVING MESSAGE")
        super.onMessageReceived(remoteMessage)

        val builder = JobInfo.Builder(jobId++, ComponentName(this, NotificationService::class.java))

        val extras = PersistableBundle()
        extras.putString("subject", remoteMessage!!.data["subject"]!!)
        extras.putString("message", remoteMessage.data["message"]!!)
        extras.putInt("group", remoteMessage.data["group"]!!.toInt())

        builder.setRequiredNetworkType(JobInfo.NETWORK_TYPE_ANY)
        builder.setOverrideDeadline(20000)

        builder.run {
            setExtras(extras)
        }

        (getSystemService(Context.JOB_SCHEDULER_SERVICE) as JobScheduler).schedule(builder.build())
    }
}