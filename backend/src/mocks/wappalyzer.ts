class Site {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  async analyze() {
    return {
      urls: ["https://url1.com", "https://url1.com/home"],
      technologies: [
        {
          name: "Nodejs",
        },
        {
          name: "React",
        },
      ],
    };
  }
}

export class WappalyzerMock {
  async open(url: string, options: {}) {
    return new Site(url);
  }
}
