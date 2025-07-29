import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class RegistrationPage extends BasePage {
  private titleMr: Locator;
  private titleMrs: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private daySelect: Locator;
  private monthSelect: Locator;
  private yearSelect: Locator;
  private newsletterCheckbox: Locator;
  private offersCheckbox: Locator;

  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private companyInput: Locator;
  private addressInput: Locator;
  private address2Input: Locator;
  private countrySelect: Locator;
  private stateInput: Locator;
  private cityInput: Locator;
  private zipInput: Locator;
  private mobileInput: Locator;

  private createAccountBtn: Locator;

  constructor(page: Page) {
    super(page);

    this.titleMr = page.locator('#id_gender1');
    this.titleMrs = page.locator('#id_gender2');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.daySelect = page.locator('#days');
    this.monthSelect = page.locator('#months');
    this.yearSelect = page.locator('#years');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.offersCheckbox = page.locator('#optin');

    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.companyInput = page.locator('#company');
    this.addressInput = page.locator('#address1');
    this.address2Input = page.locator('#address2');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipInput = page.locator('#zipcode');
    this.mobileInput = page.locator('#mobile_number');

    this.createAccountBtn = page.locator('button[data-qa="create-account"]');
  }

  async fillAccountInfo({
    title = 'Mr',
    password,
    day = '10',
    month = '5',
    year = '1995',
    subscribe = true,
    receiveOffers = true
  }: {
    title?: 'Mr' | 'Mrs';
    password: string;
    day?: string;
    month?: string;
    year?: string;
    subscribe?: boolean;
    receiveOffers?: boolean;
  }) {
    await this.click(title === 'Mr' ? this.titleMr : this.titleMrs);
    await this.type(this.passwordInput, password);
    await this.selectByValue(this.daySelect, day);
    await this.selectByValue(this.monthSelect, month);
    await this.selectByValue(this.yearSelect, year);

    if (subscribe) await this.click(this.newsletterCheckbox);
    if (receiveOffers) await this.click(this.offersCheckbox);
  }

  async fillAddressInfo({
    firstName,
    lastName,
    company,
    address,
    address2,
    country,
    state,
    city,
    zip,
    mobile
  }: {
    firstName: string;
    lastName: string;
    company?: string;
    address: string;
    address2?: string;
    country: string;
    state: string;
    city: string;
    zip: string;
    mobile: string;
  }) {
    await this.type(this.firstNameInput, firstName);
    await this.type(this.lastNameInput, lastName);
    if (company) await this.type(this.companyInput, company);
    await this.type(this.addressInput, address);
    if (address2) await this.type(this.address2Input, address2);
    await this.selectByVisibleText(this.countrySelect, country);
    await this.type(this.stateInput, state);
    await this.type(this.cityInput, city);
    await this.type(this.zipInput, zip);
    await this.type(this.mobileInput, mobile);
  }

  async submitRegistration() {
    await this.click(this.createAccountBtn);
  }

  getEmailInput() {
    return this.emailInput;
  }
}
