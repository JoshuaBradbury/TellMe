package uk.ac.kcl.tellme

import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.IOException

var client = OkHttpClient()

@Throws(IOException::class)
fun get(url: String, headers: Map<String, String> = mapOf()): String {
    val requestStart = Request.Builder().url(url)

    for ((key, value) in headers) {
        requestStart.addHeader(key, value)
    }

    val request = requestStart.build()
    val response = client.newCall(request).execute()
    return response.body()!!.string()
}