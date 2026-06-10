import {Component} from '@angular/core';
import {ExpandableComponent} from './expandable.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ExpandableComponent],
  template: `
    <h1>animate.leave Bug Repro</h1>
    <h3>Click "Toggle B" while A is open — A should shrink smoothly (it doesn't on 21.2).</h3>
    <p>
      With Angular <strong>~21.1.0</strong>: both panels animate (grow on enter, shrink on leave).<br>
      With Angular <strong>~21.2.0</strong>: the closing panel is removed <em>instantly</em> — no shrink animation.
    </p>
    @for (s of sections; track s) {
      <app-expandable [id]="s" [open]="openId === s" (toggle)="openId = $event" />
    }
  `,
  styles: [`
    :host { display: block; font-family: sans-serif; padding: 24px; max-width: 500px; }
    h1 { margin-bottom: 4px; }
  `],
})
export class App {
  sections = ['A', 'B'];
  openId = 'A';
}
