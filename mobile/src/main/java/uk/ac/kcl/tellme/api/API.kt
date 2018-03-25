package uk.ac.kcl.tellme.api

import android.annotation.SuppressLint
import android.util.Base64
import org.json.JSONObject
import uk.ac.kcl.tellme.get
import java.text.DateFormat
import java.text.ParseException
import java.text.SimpleDateFormat

var groups = mutableListOf<Group>()

data class Announcement(val id: Int, val subject: String, val time: String, val content: String)

data class Group(val id: Int, val name: String)

@SuppressLint("SimpleDateFormat")
fun getAnnouncements(groupId: Int, n: Int, userName: String): List<Announcement> {
    val nParam = if (n < 0) "all" else n.toString()
    val res = get("https://tellme.newagedev.co.uk/api/v1.0/announcement/$groupId?n=$nParam", mapOf("Authorization" to "Basic ${Base64.encodeToString(("$userName:").toByteArray(), Base64.NO_WRAP)}"))
    if (res == "-1") {
        return listOf(Announcement(-1, "", "", ""))
    } else {
        val response = JSONObject(res)
        if (response.getInt("status") == 200) {
            val announcements = mutableListOf<Announcement>()
            val jsonAnnouncements = response.getJSONArray("announcements")
            for (i in 0 until jsonAnnouncements.length()) {
                val obj = jsonAnnouncements.getJSONObject(i)

                val format = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
                try {
                    val date = format.parse(obj.getString("time_sent"))
                    val df = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.SHORT)
                    announcements.add(Announcement(obj.getInt("announcement_id"), obj.getString("subject"), df.format(date), obj.getString("message")))
                } catch (e: ParseException) {
                    e.printStackTrace()
                }
            }
            return announcements
        }
    }
    return listOf()
}

fun getAllGroups(userName: String): Boolean {
    groups = mutableListOf()
    if (userName.isNotEmpty()) {
        val res = get("https://tellme.newagedev.co.uk/api/v1.0/group", mapOf("Authorization" to "Basic ${Base64.encodeToString(userName.toByteArray(), Base64.DEFAULT).trim()}"))
        return if (res == "-1") {
            false
        } else {
            val response = JSONObject(res)
            if (response.getInt("status") == 200) {
                val jsonGroups = response.getJSONArray("groups")
                for (i in 0 until jsonGroups.length()) {
                    val obj = jsonGroups.getJSONObject(i)
                    groups.add(Group(obj.getInt("groupId"), obj.getString("groupName")))
                }
            }
            true
        }
    }
    return true
}