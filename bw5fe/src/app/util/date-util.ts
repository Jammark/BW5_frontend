export class DateUtil {

  static format(data:Date){
    let options: Intl.DateTimeFormatOptions[] = [{year: 'numeric'}, {month: '2-digit'}, {day: '2-digit'}];
let joined = DateUtil.join(data, options, '-');
    return joined;
  }

  static join(date:Date, options:Intl.DateTimeFormatOptions[], separator:string) {
    function format(option:Intl.DateTimeFormatOptions) {
       let formatter = new Intl.DateTimeFormat('en', option);
       return formatter.format(date);
    }
    return options.map(format).join(separator);
 }

 static parse(s:string):Date{
  return  new Date(s);
 }
}
