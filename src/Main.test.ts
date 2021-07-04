import test from 'ava';
import { emit } from 'process';
import { Main } from './Main';

test('test A', async (t) => {
	let main: Main = new Main(1);
	t.true(true);
	t.truthy(1);
	t.false(false);
	t.falsy(undefined);
	t.falsy(null);
	t.deepEqual({ foo: { bar: 1, another: 'one' }}, { foo: { bar: 1, another: 'one' }});
	t.assert(main.sum(0.5, 0.5) === 1);
	t.like({ hum: 'bug', foo: 'bar' }, { foo: 'bar' });
	t.not(1, 2);
	t.notDeepEqual({ foo: { bar: 1, another: 'one' }}, { foo: { bar: 2, another: 'one' }});
	t.notRegex('ASDASD123124@#$@#$', /[a-z]/);
	t.notThrows(() => { return true; })
	await t.notThrowsAsync(async () => { return true; })
	t.timeout(100, 'wait');
	const firstTry =  await t.try((tt) => { tt.true(false); });
	if (firstTry.passed) {
		firstTry.commit(); // pass/fail with this
	} else {
		firstTry.discard(); // ignore result
	}
	t.is(main.sum(1.6666666, 1.3333333), 2);
	t.is(main.sum(1.7, 0.2), 1);
	t.is(main.sum(0.8, 1.1), 1);
	t.is(main.sum(0.01, 0), 0);
	t.is(main.sum(0, 0.01), 0);
	t.is(main.sum(0.999999999, 0.000000001), 1, 'message');
	t.log('log msg', { log: 'obj' });
	// t.fail('manually fail');
});
