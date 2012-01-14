Ext.ns('Bajjutsu')

Bajjutsu.Screen = Ext.extend(Ext.Panel,
  constructor: (cfg = {}) ->
    @charge = new Bajjutsu.Charge()
    @health = new Bajjutsu.Health()
    cfg = Ext.applyIf(cfg,
      dockedItems: [
        new Ext.Toolbar(
          dock: 'top'
          height: 48
          items: [
            {
              cls: 'logo'
              height: 48
              xtype: 'spacer'
            }
          ]
        )
      ]
      items: [
        {
          flex: 1
          items: [
            @charge
            @health
          ]
          layout:
            align: 'stretch'
            type: 'hbox'
        }
        new Bajjutsu.Technique()
      ]
      layout:
        align: 'stretch'
        type: 'vbox'
    )
    Bajjutsu.Screen.superclass.constructor.call(@, cfg)
  reset: ->
    @charge.resetCharge()
    @health.resetHealth()
)
Ext.reg('screen', Bajjutsu.Screen)
