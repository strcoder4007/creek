import { CreekPage } from './app.po';

describe('creek App', () => {
  let page: CreekPage;

  beforeEach(() => {
    page = new CreekPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
