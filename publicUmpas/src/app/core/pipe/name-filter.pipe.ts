import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter',
  pure: false
})
export class NameFilterPipe implements PipeTransform {
  transform(items: any[], name: any): any {
    return items.filter((item) => item.name.includes(name));
  }

}
