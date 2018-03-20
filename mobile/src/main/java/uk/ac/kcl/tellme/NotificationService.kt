package uk.ac.kcl.tellme

import android.annotation.SuppressLint
import android.app.Notification
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.app.job.JobParameters
import android.app.job.JobService
import android.content.Context
import android.content.Intent
import android.os.AsyncTask
import android.os.Build
import android.os.IBinder
import android.service.notification.NotificationListenerService
import android.support.v4.app.NotificationCompat
import android.support.v4.app.NotificationManagerCompat
import android.support.v4.app.TaskStackBuilder
import android.support.v4.content.ContextCompat
import android.util.Log
import uk.ac.kcl.tellme.api.getAllGroups
import uk.ac.kcl.tellme.api.groups

class NotificationService : JobService() {

    override fun onStopJob(params: JobParameters?): Boolean {
        return false
    }

    override fun onStartJob(params: JobParameters?): Boolean {
        val task = @SuppressLint("StaticFieldLeak")
        object : AsyncTask<Void, Void, Unit>() {
            override fun doInBackground(vararg params: Void?) {
                getAllGroups()
            }

            override fun onPostExecute(result: Unit?) {
                super.onPostExecute(result)

                for (group in groups) {
                    Log.d(MainActivity::class.simpleName, "checking $group.id")
                    if (group.id == params!!.extras.getInt("group")) {
                        sendNotification(params.extras.getString("subject"), params.extras.getString("message"), group.id)
                        break
                    }
                }
            }
        }
        task.execute()

        return false
    }

    private fun sendNotification(subject: String, message: String, groupId: Int) {
        val notificationId = (System.currentTimeMillis() % 60000).toInt()

        val resultIntent = Intent(this, CategoryActivity::class.java)
        resultIntent.putExtra("groupId", groupId)

        val stackBuilder = TaskStackBuilder.create(this)
        stackBuilder.addNextIntentWithParentStack(resultIntent)
        val resultPendingIntent = stackBuilder.getPendingIntent(0, PendingIntent.FLAG_UPDATE_CURRENT)


        val notification = NotificationCompat.Builder(this, "announcements")
                .setContentTitle(subject)
                .setContentText(message)
                .setContentIntent(resultPendingIntent)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setStyle(NotificationCompat.BigTextStyle().bigText(message))
                .setAutoCancel(true)
                .setColor(ContextCompat.getColor(this, R.color.colorKcl))

        NotificationManagerCompat.from(this).notify(notificationId, notification.build())
    }
}
