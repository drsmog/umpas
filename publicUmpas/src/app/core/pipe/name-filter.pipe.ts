import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter',
  pure: false
})
export class NameFilterPipe implements PipeTransform {
  nameFieldDefault = item => item.name;

  transform(items: any[], name: any, getNameField?: (item: any) => string): any {
    if (!getNameField) {
      getNameField = this.nameFieldDefault;
    }

    return items.filter((item) => getNameField(item).includes(name));
  }

}
