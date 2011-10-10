Ext.ns('Bajjutsu')

Bajjutsu.Charge = Ext.extend(Ext.Carousel,
  constructor: (cfg = {}) ->
    cfg = Ext.applyIf(cfg,
      activeItem: 3
      cls: 'charge'
      direction: 'vertical'
      items: [
        {
          cls: 'charge_3'
        }
        {
          cls: 'charge_2'
        }
        {
          cls: 'charge_1'
        }
        {
          cls: 'charge_0'
        }
      ]
      flex: 1
      indicator: false
    )
    Bajjutsu.Charge.superclass.constructor.call(@, cfg)
  setCharge: (charge) ->
    unless @flag
      @flag = true
      charge = 0 if charge < 0
      charge = 3 if charge > 3
      @charge = charge
      @setActiveItem(3 - charge)
  resetCharge: ->
    @setCharge(0)
)
