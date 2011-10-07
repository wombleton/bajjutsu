Ext.ns('Bajjutsu')

Bajjutsu.Health = Ext.extend(Ext.Panel,
  constructor: (cfg = {}) ->
    cfg = Ext.applyIf(cfg,
      cls: 'health'
      flex: 1
    )
    Bajjutsu.Health.superclass.constructor.call(@, cfg)
    @on('render', ->
      @resetHealth(false)
      @mon(@el,
        drag: (event) ->
          { absDeltaX, absDeltaY, deltaY } = event
          if deltaY < -10 and absDeltaY / absDeltaX > 4
            @setHealth(@health + 1)
          else if deltaY > 10 and absDeltaY / absDeltaX > 4
            @setHealth(@health - 1)
        scope: @
        singletap: (event, target) ->
          @setHealth()
        touchend: (event) ->
          @flag = false
      )
    , @)

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
