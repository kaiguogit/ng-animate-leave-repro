import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-expandable',
  standalone: true,
  template: `
    <button class="header" (click)="toggle.emit(id)">
      <span class="chevron" [class.up]="open">▶</span>
      Section {{ id }}
    </button>
    @if (open) {
      <div class="panel" animate.enter="enter" animate.leave="leave">Panel {{ id }} content</div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        border: 1px solid #c4c4c4;
        border-bottom: none;
      }
      :host:last-of-type {
        border-bottom: 1px solid #c4c4c4;
      }
      .header {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        box-sizing: border-box;
        padding: 12px 14px;
        border: none;
        background: #f3f3f3;
        font: inherit;
        font-weight: 600;
        text-align: left;
        cursor: pointer;
      }
      .chevron {
        display: inline-block;
        transition: transform 150ms ease-in-out;
      }
      .chevron.up {
        transform: rotate(90deg);
      }
      .panel {
        overflow: hidden;
        background: #cfe3ff;
        padding: 0 14px;
        line-height: 80px;
      }
      .enter {
        animation: grow 600ms ease-in-out;
      }
      .leave {
        animation: shrink 600ms ease-in-out forwards;
      }
      @keyframes grow {
        from {
          height: 0;
        }
        to {
          height: 80px;
        }
      }
      @keyframes shrink {
        from {
          height: 80px;
        }
        to {
          height: 0;
        }
      }
    `,
  ],
})
export class ExpandableComponent {
  @Input() id!: string;
  @Input() open = false;
  @Output() toggle = new EventEmitter<string>();
}
