import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-expandable',
  standalone: true,
  template: `
    <button (click)="toggle.emit(id)">Toggle {{ id }}</button>
    @if (open) {
      <div class="panel" animate.enter="enter" animate.leave="leave">Panel {{ id }} content</div>
    }
  `,
  styles: [`
    .panel { overflow: hidden; background: #cfe3ff; padding: 0 12px; }
    .enter { animation: grow 600ms ease-in-out; }
    .leave { animation: shrink 600ms ease-in-out forwards; }
    @keyframes grow   { from { height: 0; } to { height: 80px; } }
    @keyframes shrink { from { height: 80px; } to { height: 0; } }
  `],
})
export class ExpandableComponent {
  @Input() id!: string;
  @Input() open = false;
  @Output() toggle = new EventEmitter<string>();
}
