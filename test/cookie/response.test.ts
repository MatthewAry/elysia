import { Elysia, t } from '../../src'

new Elysia({
	cookie: {
		secret: 'Fischl von Luftschloss Narfidort',
		sign: ['council']
	}
})
	.get(
		'/council',
		({ cookie: { council } }) =>
			(council.value = [
				{
					name: 'Rin',
					affilation: 'Adminstration'
				}
			])
	)
	.get('/create', ({ cookie: { name } }) => (name.value = 'Himari'))
	.get(
		'/update',
		({ cookie: { name } }) => {
			if (!name.value) throw new Error('Cookie required')

			console.log(name.value)

			name.value = 'seminar: Rio'
			console.log(name.value)

			name.value = 'seminar: Himari'
			name.value = ''

			name.maxAge = 86400
			name.add({
				domain: 'millennium.sh',
				httpOnly: true
			})

			return name.value
		},
		{
			cookie: t.Object({
				name: t.String()
			})
		}
	)
	.get('/remove', ({ cookie }) => {
		for (const self of Object.values(cookie)) self.remove()

		return 'Deleted'
	})
	.listen(3000)