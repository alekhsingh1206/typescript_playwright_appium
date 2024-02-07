import Gestures from "../../../../tests/helpers/Gestures";

class SwipePage {

  // Element locator for Card Title 1
  get cardTitle1() {
    return $('~FULLY OPEN SOURCE')
  }

  // Element locator for Card Title 2
  get cardTitle2() {
    return $('~GREAT COMMUNITY')
  }

  // Method to get Card Title 1 Text
  async fullyOpenSource(): Promise<string> {
    return await this.cardTitle1.getText();
  }

  // Method to get Card Title 2 Text
  async greatCommunityText(): Promise<string> {
    return await this.cardTitle2.getText();
  }

  // Method to Check If Community Text is Displayed or Not
  async checkifCommunityTextIsDisplayed() {
    await driver.pause(2000);
    // const selector = $('~FULLY OPEN SOURCE');
    const elemRect = await driver.getElementRect(await $('~FULLY OPEN SOURCE').elementId);
    console.log("value of elemRect ", elemRect);

    const elemXCenter = Math.round(elemRect.x + (elemRect).width / 2);
    console.log("Element X center ", elemXCenter);

    const elemYCenter = Math.round((elemRect).y + (elemRect).height / 2);
    console.log("Element Y center ", elemYCenter);

    const newXPosition = 300;
    await Gestures.swipe(
      { x: elemXCenter, y: elemYCenter },
      { x: newXPosition, y: elemYCenter }
    );
  }
}

export default new SwipePage();
