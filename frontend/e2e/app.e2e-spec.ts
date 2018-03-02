import { GubotdevPage } from './app.po';

describe('gubotdev App', function() {
  let page: GubotdevPage;

  beforeEach(() => {
    page = new GubotdevPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
