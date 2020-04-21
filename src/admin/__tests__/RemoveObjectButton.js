import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import RemoveObjectButton from '../RemoveObjectButton'
import useAxios from 'axios-hooks'
jest.mock('axios-hooks')

describe('RemoveObjectButton component', () => {
  const object = { key: 1, url: 'https://example.com/api' }
  const executeMock = jest.fn()
  const updateObjectsMock = jest.fn()
  let component

  beforeEach(() => {
    useAxios.mockReturnValue([{}, executeMock])
    component = (
      <RemoveObjectButton object={object} updateObjects={updateObjectsMock} />
    )
  })

  afterEach(cleanup)

  it('matches snapshot', () => {
    const { asFragment } = render(component)
    expect(asFragment()).toMatchSnapshot()
  })

  it('execute and updateObjectsMock are called when clicking on component', async () => {
    const { getByTestId } = render(component)
    await fireEvent.click(getByTestId(object.url))
    expect(executeMock).toHaveBeenCalled()
    expect(updateObjectsMock).toHaveBeenCalledWith(object)
  })
})
