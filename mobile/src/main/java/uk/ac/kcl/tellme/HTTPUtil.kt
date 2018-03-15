package uk.ac.kcl.tellme

import okhttp3.MediaType
import okhttp3.RequestBody
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.IOException

val JSON = MediaType.parse("application/json; charset=utf-8")
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

@Throws(IOException::class)
fun post(url: String, json: String): String {
    val body = RequestBody.create(JSON, json)
    val request = Request.Builder()
            .url(url)
            .post(body)
            .build()
    val response = client.newCall(request).execute()
    return response.body()!!.string()
}s

@Throws(IOException::class)
fun put(url: String, json: String): String {
    val body = RequestBody.create(JSON, json)
    val request = Request.Builder()
            .url(url)
            .put(body)
            .build()
    val response = client.newCall(request).execute()
    return response.body()!!.string()
}

@Throws(IOException::class)
fun delete(url: String, json: String): String {
    val body = RequestBody.create(JSON, json)
    val request = Request.Builder()
            .url(url)
            .delete(body)
            .build()
    val response = client.newCall(request).execute()
    return response.body()!!.string()
}