Ext.ns('Bajjutsu')

Bajjutsu.Health = Ext.extend(Ext.Carousel,
  constructor: (cfg = {}) ->
    cfg = Ext.applyIf(cfg,
      activeItem: 0
      cls: 'health'
      direction: 'vertical'
      flex: 1
      items: [
        {
          cls: 'health_6'
        }
        {
          cls: 'health_5'
        }
        {
          cls: 'health_4'
        }
        {
          cls: 'health_3'
        }
        {
          cls: 'health_2'
        }
        {
          cls: 'health_1'
        }
      ]
      indicator: false
    )
    Bajjutsu.Health.superclass.constructor.call(@, cfg)
  setHealth: (n = @health - 1, setFlag = true) ->
    unless @flag
      @flag = true if setFlag
      n = 0 if n < 0
      n = 6 if n > 6
      @health = n
      @update("""
        <div class="badge">#{n}</div>
      """)
  resetHealth: (setFlag = true) ->
    @setHealth(6, setFlag)
)
