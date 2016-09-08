import { NgSummit2016ShelterPage } from './app.po';

describe('ng-summit-2016-shelter App', function() {
  let page: NgSummit2016ShelterPage;

  beforeEach(() => {
    page = new NgSummit2016ShelterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
