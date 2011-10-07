Ext.ns('Bajjutsu')

Bajjutsu.Charge = Ext.extend(Ext.Panel,
  constructor: (cfg = {}) ->
    cfg = Ext.applyIf(cfg,
      cls: 'charge'
      flex: 1
    )
    Bajjutsu.Charge.superclass.constructor.call(@, cfg)
    @on('render', ->
      @resetCharge(false)
      @mon(@el,
        drag: (event) ->
          { absDeltaX, absDeltaY, deltaY } = event
          if deltaY < -10 and absDeltaY / absDeltaX > 4
            @setCharge(@charge + 1)
          else if deltaY > 10 and absDeltaY / absDeltaX > 4
            @setCharge(@charge - 1)
        scope: @
        singletap: ->
          @setCharge(@charge + 1)
        doubletap: ->
          @resetCharge()
        touchend: ->
          @flag = false
      )
    )
  setCharge: (charge, setFlag = true) ->
    unless @flag
      @flag = true if setFlag
      charge = 0 if charge < 0
      charge = 3 if charge > 3
      @charge = charge
      @update("""
        <div class="badge">#{charge}</div>
    """)
  resetCharge: (setFlag = true) ->
    @setCharge(0, setFlag)
)
