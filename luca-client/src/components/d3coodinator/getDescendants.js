const data = {
  name: "Ymir",
  children: [
    {
      name: "Eren",
      children: [{ name: "Armin" }, { name: "Erwin" }],
    },
    { name: "Mikasa" },
    {
      name: "Levi",
      children: [
        { name: "Falco" },
        { name: "Ani" },
        {
          children: [
            { name: "Armin" },
            { name: "Erwin" },
            { name: "Armin" },
            { name: "Erwin" },
            { name: "Armin" },
            { name: "Erwin" },
            {
              children: [
                { name: "Armin" },
                { name: "Erwin" },
                { name: "Bertoldt" },
                { name: "Historia" },
                { name: "Armin" },
                {
                  children: [
                    { name: "Armin" },
                    { name: "Erwin" },
                    { name: "Bertoldt" },
                    { name: "Historia" },
                    { name: "Armin" },
                    {
                      children: [
                        { name: "Armin" },
                        { name: "Erwin" },
                        { name: "Bertoldt" },
                        { name: "Historia" },
                        { name: "Armin" }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
    },
    {
      name: "Reiner",
      children: [{ name: "Historia" }, { name: "Bertoldt" }, { name: "Sasha" }],
    },
  ],
};

export { data };
