import { ScrollTrackerDirective } from './scrollTracker.directive';

describe('ScrollTrackerDirective', () => {
  it('should create an instance', () => {
    const directive = new ScrollTrackerDirective();
    expect(directive).toBeTruthy();
  });

  it('should emit scrolled event', () => {
    const directive = new ScrollTrackerDirective();

    const mockEvent1 = {
      target: {
        scrollHeight: 500,
        clientHeight: 500,
        scrollTop: 0
      }
    };

    const mockEvent2 = {
      target: {
        scrollHeight: 1000,
        clientHeight: 500,
        scrollTop: 0
      }
    };

    spyOn(directive.scrolled, 'emit');
    directive.onScroll(mockEvent1);
    expect(directive.scrolled.emit).toHaveBeenCalledWith({ pos: 0, endReached: true });

    directive.onScroll(mockEvent2);
    expect(directive.scrolled.emit).toHaveBeenCalledWith({ pos: 0, endReached: false });
  });
});
