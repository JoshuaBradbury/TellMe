package uk.ac.kcl.tellme

import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.IOException

var client = OkHttpClient()

fun get(url: String, headers: Map<String, String> = mapOf()): String {
    val requestStart = Request.Builder().url(url)

    for ((key, value) in headers) {
        requestStart.addHeader(key, value)
    }

    val request = requestStart.build()

    return try {
        val response = client.newCall(request).execute()
        response.body()!!.string()
    } catch (e: IOException) {
        "-1"
    }
}