package uk.ac.kcl.tellme


import android.content.Context
import android.support.v7.widget.CardView
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import kotlinx.android.synthetic.main.box_list.view.*


class CourseAdapter(private val context : Context, val items: ArrayList<CourseInfo>) :
        RecyclerView.Adapter<CourseAdapter.ViewHolder>() {



    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {

        val v = LayoutInflater.from(parent ?.context).inflate(R.layout.box_list, parent, false)
        val card = v.findViewById<View>(R.id.card_view) as CardView
        card.maxCardElevation=2.0F


        return ViewHolder(v)
    }

    override fun getItemCount(): Int {
        return items.size
    }


    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val course: CourseInfo = items[position]

        holder.title.text = course.title
        holder.teacher.text = course.teacher
        holder.date.text = course.date
        holder.preview.text = course.preview

    }



//    override fun onAttachedToRecyclerView(recyclerView: RecyclerView) {
//        super.onAttachedToRecyclerView(recyclerView)
//    }

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val title = itemView.findViewById<View>(R.id.title) as TextView
        val teacher= itemView.findViewById<View>(R.id.teacher) as TextView
        val date =  itemView.findViewById<View>(R.id.date) as TextView
        val preview = itemView.findViewById<View>(R.id.preview) as TextView
    }
}