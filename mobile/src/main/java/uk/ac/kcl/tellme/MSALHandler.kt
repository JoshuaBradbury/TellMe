package uk.ac.kcl.tellme

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.os.AsyncTask
import android.preference.PreferenceManager
import android.util.Log
import com.microsoft.identity.client.*
import org.json.JSONObject
import uk.ac.kcl.tellme.api.getAllGroups

enum class MSALAction {
    LOGOUT,
    EXIT
}

class MSALHandler(context: Context, val activity: MainActivity) {
    private val SCOPES = arrayOf("https://graph.microsoft.com/User.Read")
    private val MSGRAPH_URL = "https://graph.microsoft.com/v1.0/me"
    private val CLIENT_ID = "c4d8ad78-18b5-4bdd-afa2-50617a34e8cf"

    private var authResult: AuthenticationResult? = null
    private var sampleApp: PublicClientApplication? = null

    init {
        sampleApp = PublicClientApplication(context, CLIENT_ID)
    }

    fun login() {
        val app = sampleApp!!
        val users = app.users

        if (users.isNotEmpty())
            app.acquireTokenSilentAsync(SCOPES, users[0], getAuthCallback())
        else
            onCallGraphClicked()
    }

    fun logout() {
        Log.d(MainActivity.TAG,"LOGGING OUT")
        val app = sampleApp!!
        if (app.users.isNotEmpty())
            for (user in app.users)
                app.remove(user)
    }

    fun callGraphAPI(): String {
        if (authResult?.accessToken == null)
            return ""

        val task = @SuppressLint("StaticFieldLeak")
        object : AsyncTask<Void, Void, String>() {
            override fun doInBackground(vararg params: Void?): String {
                val res = get(MSGRAPH_URL, mapOf("Authorization" to "Bearer " + authResult!!.accessToken))
                Log.d(MainActivity::class.simpleName, res)
                return res
            }
        }
        task.execute()

        val obj = JSONObject(task.get())
        return obj.getString("userPrincipalName")
    }

    fun handleInteractiveRequestRedirect(requestCode: Int, resultCode: Int, data: Intent) {
        sampleApp?.handleInteractiveRequestRedirect(requestCode, resultCode, data)
    }

    private fun onCallGraphClicked() {
        sampleApp?.acquireToken(activity, SCOPES, "", UiBehavior.FORCE_LOGIN, "domain_hint=kcl.ac.uk", getAuthCallback())
    }

    private fun getAuthCallback(): AuthenticationCallback {
        return object : AuthenticationCallback {
            override fun onSuccess(authenticationResult: AuthenticationResult) {
                authResult = authenticationResult

                val userName = callGraphAPI()

                val preferences = PreferenceManager.getDefaultSharedPreferences(activity.applicationContext)

                val editor = preferences.edit()
                editor.putString("user", userName)
                editor.apply()

                val intent = Intent(activity, CategoryActivity::class.java)

                activity.startActivity(intent)
            }

            override fun onError(exception: MsalException) {
                Log.e(MainActivity.TAG, "Authentication failed: " + exception.toString())
                activity.finish()
            }

            override fun onCancel() {
                Log.d(MainActivity.TAG, "User cancelled login.")
                activity.finish()
            }
        }
    }
}