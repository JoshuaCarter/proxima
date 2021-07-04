import test from 'ava';

const fn = () => 'foo';

test('test A', t => {
	t.is(fn(), 'foo');
});
