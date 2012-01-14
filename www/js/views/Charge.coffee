Ext.ns('Bajjutsu')

Bajjutsu.Charge = Ext.extend(Ext.Carousel,
  constructor: (cfg = {}) ->
    cfg = Ext.applyIf(cfg,
      activeItem: 0
      charge: 0
      cls: 'charge-panel'
      direction: 'vertical'
      items: [
        {
          cls: 'charge charge_0'
        }
        {
          cls: 'charge charge_1'
        }
        {
          cls: 'charge charge_2'
        }
        {
          cls: 'charge charge_3'
        }
      ]
      flex: 1
      indicator: false
      listeners:
        cardswitch: ->
          @resetTask.cancel()
        scope: @

    )
    Bajjutsu.Charge.superclass.constructor.call(@, cfg)
    @on('render', ->
      @mon(@el,
        scope: @
        singletap: ->
          @setCharge(0)
        touchstart: (event) ->
          @resetTask ?= new Ext.util.DelayedTask(->
            @up('screen').reset()
          , @)
          @resetTask.delay(1000)
        touchend: ->
          @resetTask.cancel()
      , @)
    )
  setCharge: (charge) ->
    charge = 0 if charge < 0
    charge = 3 if charge > 3
    @charge = charge
    @setActiveItem(charge,
      direction: 'down'
      type: 'slide'
    )
  resetCharge: ->
    @setCharge(0)
)
