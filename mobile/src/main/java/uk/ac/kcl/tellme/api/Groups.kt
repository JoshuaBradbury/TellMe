package uk.ac.kcl.tellme.api

import uk.ac.kcl.tellme.get
import org.json.JSONObject

data class Group(val groupId: Int, val groupName: String)

fun getAllGroups(): List<Group> {
    var response = JSONObject(get("https://tellme.newagedev.co.uk/api/v1.0/group"))
    if (response.getInt("status") == 200) {
        var groups = mutableListOf<Group>()
        val jsonGroups = response.getJSONArray("groups")
        for (i in 0 until jsonGroups.length()) {
            val obj = jsonGroups.getJSONObject(i)
            groups.add(Group(obj.getInt("groupId"), obj.getString("groupName")))
        }
        return groups
    }
    return listOf()
}