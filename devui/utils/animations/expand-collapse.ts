import { animate, animateChild, AnimationTriggerMetadata, query, state, style, transition, trigger } from '@angular/animations';
import { AnimationCurves, AnimationDuration } from './animationParameters';

const easeInOut = AnimationCurves.EASE_IN_OUT;
const duration = AnimationDuration.SLOW;

export const expandCollapse: AnimationTriggerMetadata = trigger('collapse', [
  state('expanded', style({ opacity: 1, height: '*', overflow: 'hidden' })),
  state('collapsed', style({ opacity: 0, height: 0, overflow: 'hidden' })),
  transition('collapsed => expanded', animate(`${duration} ${easeInOut}`)),
  transition('expanded => collapsed', animate(`${duration} ${easeInOut}`))
]);

export const expandCollapseForDomDestroy: AnimationTriggerMetadata = trigger('collapseForDomDestroy', [
  transition(':enter', [
    style({ opacity: 0, height: 0, overflow: 'hidden' }),
    animate(`${duration} ${easeInOut}`, style({ opacity: 1, height: '*', overflow: 'hidden' })),
  ]),
  transition(':leave', [
    style({ opacity: 1, height: '*', overflow: 'hidden' }),
    animate(`${duration} ${easeInOut}`, style({ opacity: 0, height: 0, overflow: 'hidden' })),
  ]),
]);

// todo: 可作成函数指定selector eg: '.devui-sub-menu-children'
export const expandCollapseForDomDestroyWithChildren: AnimationTriggerMetadata = trigger('collapseForDomDestroyWithChildren', [
  transition(':enter', [
    style({ opacity: 0, height: 0, overflow: 'hidden' }),
    animate(`${duration} ${easeInOut}`, style({ opacity: 1, height: '*', overflow: 'hidden' })),
    query('@collapseForDomDestroyWithChildren', animateChild({
      delay: duration
    }), { optional: true })
  ]),
  transition(':leave', [
    style({ opacity: 1, height: '*', overflow: 'hidden' }),
    animate(`${duration} ${easeInOut}`, style({ opacity: 0, height: 0, overflow: 'hidden' })),
    query('@collapseForDomDestroyWithChildren', animateChild({
      delay: duration
    }), { optional: true })
  ]),
]);
