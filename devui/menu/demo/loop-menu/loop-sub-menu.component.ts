import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { MenuItemType } from 'ng-devui/menu';
import { LoopMenuComponent } from './loop-menu.component';
@Component({
  selector: 'loop-sub-menu',
  template: `
    <div d-sub-menu
      [title]="menu.name"
      [icon]="menu.icon"
      [disabled]="disabledKeys.includes(menu.key)"
      [open]="openKeys.includes(menu.key)"
      (openChange)="loopMenuComponent.openChange($event, menu.key)">
      <ng-container *ngFor="let item of menu.children; trackBy: trackByMenu">
        <loop-sub-menu
          [menu]="item"
          [disabledKeys]="disabledKeys"
          [openKeys]="openKeys"
          [activeKey]="activeKey"
          *ngIf="item.children?.length; else leafTpl" />
        <ng-template #leafTpl>
          <div d-menu-item (itemClick)="loopMenuComponent.itemClick(item.key)" [active]="item.key === activeKey">
            <d-icon class="devui-menu-item-icon" *ngIf="item.icon" [icon]="item.icon" />
            <span class="devui-menu-item-name over-flow-ellipsis">{{ item.name }}</span>
          </div>
        </ng-template>
      </ng-container>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  })
export class LoopSubMenuComponent implements OnInit {
  @Input() disabledKeys: string[] = [];
  @Input() openKeys: string[] = [];
  @Input() activeKey = '';

  protected loopMenuComponent = inject(LoopMenuComponent);
  @Input({ required: true }) menu: MenuItemType;
  ngOnInit() { }

  trackByMenu(_: number, item: MenuItemType) {
    return item.key;
  }
}
