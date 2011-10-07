Ext.ns('Bajjutsu')

Bajjutsu.Screen = Ext.extend(Ext.Panel,
  constructor: (cfg = {}) ->

    charge = new Bajjutsu.Charge()
    health = new Bajjutsu.Health()
    cfg = Ext.applyIf(cfg,
      dockedItems: [
        new Ext.Toolbar(
          dock: 'top'
          items: [
            {
              xtype: 'spacer'
            }
            {
              handler: ->
                charge.resetCharge(false)
                health.resetHealth(false)
              text: 'Meditate'
              xtype: 'button'
            }
          ]
          title: 'Bajjutsu Master'
        )
      ]
      items: [
        {
          flex: 1
          items: [
            charge
            health
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
)
