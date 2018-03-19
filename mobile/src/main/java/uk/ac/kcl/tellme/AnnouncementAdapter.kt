package uk.ac.kcl.tellme

import android.support.v7.widget.CardView
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import uk.ac.kcl.tellme.api.Announcement

class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
    val title = itemView.findViewById<View>(R.id.title) as TextView
    val date =  itemView.findViewById<View>(R.id.date) as TextView
    val preview = itemView.findViewById<View>(R.id.preview) as TextView
}

class AnnouncementAdapter(private val announcements: List<Announcement>) : RecyclerView.Adapter<ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val v = LayoutInflater.from(parent.context).inflate(R.layout.box_list, parent, false)
        val card = v.findViewById<CardView>(R.id.card_view) as CardView
        card.maxCardElevation=2.0F

        return ViewHolder(v)
    }

    override fun getItemCount(): Int {
        return announcements.size
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val announcement = announcements[position]

        holder.title.text = announcement.subject
        holder.date.text = announcement.time.toString()
        holder.preview.text = announcement.content
    }
}