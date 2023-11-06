class _ConvertDate {
  iosDateToTimestamp(iosStr: string): number {
    const date = new Date(iosStr);

    const timestamp = date.getTime();
    return timestamp;
  }
  convertDateToMilliseconds(date: Date) {
    return Math.floor(date.getTime());
  }
  convertDateToSeconds(date: Date) {
    return Math.floor(date.getTime() / 1000.0);
  }
  // convert unix timestamp to milliseconds
  convertMilliseconds(ts) {
    return ts * 1000;
  }
  // initialize new Date object
  createNewDate(ts): Date {
    const ts_ms = this.convertMilliseconds(ts);
    return new Date(ts_ms);
  }
  // year as 4 digits (YYYY)
  getYear(date_ob: Date) {
    return date_ob.getFullYear();
  }
  // month as 2 digits (MM)
  getMonth(date_ob: Date) {
    return ('0' + (date_ob.getMonth() + 1)).slice(-2);
  }
  // date as 2 digits (DD)
  getDate(date_ob: Date) {
    return ('0' + date_ob.getDate()).slice(-2);
  }
  // hours as 2 digits (hh)
  getHours(date_ob: Date) {
    return ('0' + date_ob.getHours()).slice(-2);
  }
  // minutes as 2 digits (mm)
  getMinutes(date_ob: Date) {
    return ('0' + date_ob.getMinutes()).slice(-2);
  }
  // seconds as 2 digits (ss)
  getSeconds(date_ob: Date) {
    return ('0' + date_ob.getSeconds()).slice(-2);
  }
}

const ConvertDate = new _ConvertDate();
export default ConvertDate;
