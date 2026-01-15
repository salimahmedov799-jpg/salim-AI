class MainActivity : AppCompatActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    val web = findViewById<WebView>(R.id.web)

    web.settings.javaScriptEnabled = true
    web.settings.mediaPlaybackRequiresUserGesture = false
    web.settings.domStorageEnabled = true

    web.webChromeClient = WebChromeClient()

    web.loadUrl("https://salimahmedov799-jpg.github.io/salim-AI/")
  }
}
class Bridge(val ctx: Context) {

  @JavascriptInterface
  fun vibrate(){
    val v = ctx.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
    v.vibrate(300)
  }
}
web.addJavascriptInterface(Bridge(this), "Android")
