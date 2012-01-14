Ext.ns('Bajjutsu')

Bajjutsu.Health = Ext.extend(Ext.Carousel,
  constructor: (cfg = {}) ->
    cfg = Ext.applyIf(cfg,
      activeItem: 6
      cls: 'health-panel'
      direction: 'vertical'
      flex: 1
      health: 6
      items: [
        {
          cls: 'health health_0'
        }
        {
          cls: 'health health_1'
        }
        {
          cls: 'health health_2'
        }
        {
          cls: 'health health_3'
        }
        {
          cls: 'health health_4'
        }
        {
          cls: 'health health_5'
        }
        {
          cls: 'health health_6'
        }
      ]
      indicator: false
      listeners:
        cardswitch: ->
          @resetTask.cancel()
        scope: @
    )
    Bajjutsu.Health.superclass.constructor.call(@, cfg)
    @on('render', ->
      @mon(@el,
        scope: @
        touchstart: (event) ->
          @resetTask ?= new Ext.util.DelayedTask(->
            @up('screen').reset()
          , @)
          @resetTask.delay(1000)
        touchend: ->
          @resetTask.cancel()
      )
    )
  setHealth: (health) ->
    health = 0 if health < 0
    health = 6 if health > 6
    @setActiveItem(health,
      direction: 'down'
      type: 'slide'
    )
  resetHealth: ->
    @setHealth(6)
)
