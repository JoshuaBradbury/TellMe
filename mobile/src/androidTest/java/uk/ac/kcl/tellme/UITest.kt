package uk.ac.kcl.tellme

import android.support.test.espresso.Espresso.onView
import android.support.test.espresso.action.ViewActions.*
import android.support.test.espresso.assertion.ViewAssertions.doesNotExist
import android.support.test.espresso.assertion.ViewAssertions.matches
import android.support.test.espresso.matcher.RootMatchers.isDialog
import android.support.test.espresso.matcher.ViewMatchers.*
import android.support.test.rule.ActivityTestRule
import android.support.test.runner.AndroidJUnit4
import android.widget.FrameLayout
import android.widget.ImageButton
import android.widget.TextView
import kotlinx.android.synthetic.main.activity_category.view.*
import org.hamcrest.Matchers.*
import org.junit.Test
import org.junit.Assert.*
import org.junit.runner.RunWith
import org.junit.Rule

@RunWith(AndroidJUnit4::class)

class UITest {
    @Rule @JvmField
    var activityRule = ActivityTestRule<CategoryActivity>(
            CategoryActivity::class.java)
    @Test
    //opens and closes the navigation drawer
    fun testNavigationDrawer() {
        onView(withContentDescription("Navigate up")).perform(click())
        onView(withId(R.id.nav_view)).check(matches(isDisplayed()))

        onView(withId(R.id.nav_view)).perform(pressBack()).check(matches(not(isDisplayed())))

    }


    @Test
            //checks the dialog box is displayed and minimized on back press
    fun onBackPressed() {
        onView(withId(R.id.drawerLayout)).perform(pressBack())
        onView(withText("Are you sure you want to exit?")).check(matches(isDisplayed()))

        onView(withText("No")).perform(click()).check(doesNotExist())
    }


    @Test
            //navigate to logout in drawer, click and cancel
    fun pressLogOut() {
        onView(withContentDescription("Navigate up")).perform(click())

        onView(withId(R.id.logout)).perform(click())

        onView(withText("Are you sure you want to log out?")).check(matches(isDisplayed()))

        onView(withText("Cancel")).perform(click()).check(doesNotExist())
    }


}