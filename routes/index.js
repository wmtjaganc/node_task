const express = require("express");
const router = express.Router();
const rp = require("request-promise");
const cheerio = require("cheerio");

router.post("/", async (req, res, next) => {
  try {
    const { url } = req.body;

    const html = await rp(url);
    const load = cheerio.load(html);

    let data = {
      brand: "",
      model: "",
      referenceNumber: "",
      condition: "",
      price: "",
      image: "",
    };
    const pagedata = load(
      ".ux-layout-section__item.ux-layout-section__item--table-view > .ux-layout-section__row"
    );
    pagedata.each((i, element) => {
      const child = load(element).children(".ux-labels-values__labels");
      child.each((i, elementData) => {
        if (
          load(elementData)
            .children(".ux-labels-values__labels-content")
            .children("div")
            .children("span")
            .text() === "Condition:"
        ) {
          data.condition = load(elementData)
            .next()
            .children(".ux-labels-values__values-content")
            .children("div")
            .children("span")
            .next()
            .children("span")
            .children("span")
            .text();
        }
        if (
          load(elementData)
            .children(".ux-labels-values__labels-content")
            .children("div")
            .children("span")
            .text() === "Brand:"
        ) {
          data.brand = load(elementData)
            .next()
            .children(".ux-labels-values__values-content")
            .children("div")
            .children("span")
            .text();
        }
        if (
          load(elementData)
            .children(".ux-labels-values__labels-content")
            .children("div")
            .children("span")
            .text() === "Reference Number:"
        ) {
          data.referenceNumber = load(elementData)
            .next()
            .children(".ux-labels-values__values-content")
            .children("div")
            .children("span")
            .first()
            .text();
        }
        if (
          load(elementData)
            .children(".ux-labels-values__labels-content")
            .children("div")
            .children("span")
            .text() === "Model:"
        ) {
          data.model = load(elementData)
            .next()
            .children(".ux-labels-values__values-content")
            .children("div")
            .children("span")
            .first()
            .text();
        }
      });
    });

    data.price = load(".notranslate").first().text();

    const imageList = load('meta[property="og:image"]');
    data.image = imageList[0]?.attribs?.content;

    res.status(200).json({
      data,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

router.get("/test", async (req, res) => {
  try {
    const url =
      "https://www.ebay.co.uk/itm/354168298736?hash=item5276135cf0:g:g04AAOSwFTZi0bzj&amdata=enc%3AAQAHAAAA4IWguC2I8O8Bbhso6oI7kEyANPY2UrQB0ulGtGn43GzJvRDnpitwGCKDRqYxxdzemGoBEE9dKbth8wkVUil1Erzj6XW9G5r6IgUeR51sbSadb19qGYnvxmr%2BZNOgUCAO0UFs%2FVYjDjBIkfMwpi7HXKMl3%2FofQQqJEfuAqDu%2F4D%2FfivDiCg008OjBb5v9yEYc2uAgnDm%2FNIg9HG3QQeRtZlUL0rIHFa74MOT27cCgUDVRCJUEn6D62EtzZQ7241aMXdYuvBVAmebJ3v1PHfaj7fFLbC4ypmgeL34uBTn9t18b%7Ctkp%3ABFBMyJTB9cxg";

    const html = await rp(url);
    const load = cheerio.load(html);

    let data = {
      brand: "",
      model: "",
      referenceNumber: "",
      condition: "",
      price: "",
      image: "",
    };
    const pagedata = load(
      ".ux-layout-section__item.ux-layout-section__item--table-view > .ux-layout-section__row"
    );
    pagedata.each((i, element) => {
      const child = load(element).children(".ux-labels-values__labels");
      child.each((i, elementData) => {
        if (
          load(elementData)
            .children(".ux-labels-values__labels-content")
            .children("div")
            .children("span")
            .text() === "Condition:"
        ) {
          data.condition = load(elementData)
            .next()
            .children(".ux-labels-values__values-content")
            .children("div")
            .children("span")
            .next()
            .children("span")
            .children("span")
            .text();
        }
        if (
          load(elementData)
            .children(".ux-labels-values__labels-content")
            .children("div")
            .children("span")
            .text() === "Brand:"
        ) {
          data.brand = load(elementData)
            .next()
            .children(".ux-labels-values__values-content")
            .children("div")
            .children("span")
            .text();
        }
        if (
          load(elementData)
            .children(".ux-labels-values__labels-content")
            .children("div")
            .children("span")
            .text() === "Reference Number:"
        ) {
          data.referenceNumber = load(elementData)
            .next()
            .children(".ux-labels-values__values-content")
            .children("div")
            .children("span")
            .first()
            .text();
        }
        if (
          load(elementData)
            .children(".ux-labels-values__labels-content")
            .children("div")
            .children("span")
            .text() === "Model:"
        ) {
          data.model = load(elementData)
            .next()
            .children(".ux-labels-values__values-content")
            .children("div")
            .children("span")
            .first()
            .text();
        }
      });
    });

    data.price = load(".notranslate").first().text();

    const imageList = load('meta[property="og:image"]');
    data.image = imageList[0]?.attribs?.content;

    res.status(200).json({
      data,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

router.get("/health", async (req, res) => {
  try {
    res.status(200).json({
      message: "server running successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

module.exports = router;
