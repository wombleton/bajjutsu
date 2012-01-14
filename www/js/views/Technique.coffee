Ext.ns('Bajjutsu')

Bajjutsu.Technique = Ext.extend(Ext.Carousel,
  constructor: (cfg = {}) ->
    cfg = Ext.applyIf(cfg,
      cls: 'technique'
      flex: 1
      items: [
        {
          html: """
            <h1>Healing Wind Technique</h1>
            <p class="armsup"><img src="images/attack.png"/>Heals Allies</p>
          """
        }
        {
          html: """
            <h1>Stubborn Tortoise Technique</h1>
            <p class="armsup armsdown"><img src="images/attack.png"/><img src="images/block.png"/>Protected By Charge</p>
          """
        }
        {
          html: """
            <h1>Fire Form Technique</h1>
            <p class="armscrossed"><img src="images/block.png"/>Damages Attackers</p>
          """
        }
        {
          html: """
            <h1>Void Spirit Technique</h1>
            <p class="armsup"><img src="images/attack.png"/>Drains Charge</p>
          """
        }
        {
          html: """
            <h1>Winding Viper Technique</h1>
            <p class="armsup"><img src="images/attack.png"/>Hurt Blockers</p>
          """
        }
      ]
    )
    Bajjutsu.Technique.superclass.constructor.call(@, cfg)
)
