Ext.setup(
  tabletStartupScreen: 'bajjutsu.svg'
  phoneStartupScreen: 'bajjutsu.svg'
  icon: 'icon.png'
  glossOnIcon: true
  onReady: ->
    new Bajjutsu.Screen(
      fullscreen: true
    )
)
