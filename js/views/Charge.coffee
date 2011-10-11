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
    )
    Bajjutsu.Charge.superclass.constructor.call(@, cfg)
    @on('render', ->
      @mon(@el,
        scope: @
        singletap: (event) ->
          if event.touches.length is 1
            @resetCharge()
          else
            @up('screen').reset()
        touchend: ->
          @flag = false
      , @)
    )
  setCharge: (charge) ->
    unless @flag
      @flag = true
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
