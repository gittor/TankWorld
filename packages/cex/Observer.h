#pragma once

#include <set>
#include <algorithm>
#include <iterator>
#include <cassert>

namespace cex
{

	template<class ListenerType, class ValueType>
	class Monitor
	{
	public:
		Monitor()
			:m_bVisitingListener(false)
            ,m_keyListener(nullptr)
		{

		}
		void addListener(ListenerType* listener)
		{
            assert(m_keyListener != listener);

			if (m_bVisitingListener)
			{
				m_willBeAdded.insert(listener);
			}
			else
			{
				m_listeners.insert(listener);
			}		
		}
		void removeListener(ListenerType* listener)
		{
            if (m_keyListener == listener)
            {
                m_keyListener = nullptr;
            }
			else if (m_bVisitingListener)
			{
				m_willBeRemoved.insert(listener);
			}
			else
			{
				m_listeners.erase(listener);
			}
		}
		void clearListener()
		{
			m_willBeAdded.clear();
			m_listeners.clear();
			m_willBeRemoved.clear();
            m_keyListener = nullptr;
		}
        void setKeyListener(ListenerType* listener)
        {
            assert(!m_bVisitingListener);
            m_listeners.erase(listener);
            m_keyListener = listener;
        }

	protected:
		void notifyStateChanged(ValueType value)
		{
			m_bVisitingListener = true;
			for (typename std::set<ListenerType*>::iterator iter = m_listeners.begin(); iter!=m_listeners.end(); ++iter)
			{
				(*iter)->onStateChanged(value);
			}
            if (m_keyListener)
            {
                m_keyListener->onStateChanged(value);
            }
			m_bVisitingListener = false;

			if (!m_willBeRemoved.empty())
			{
				std::set<ListenerType*> temp;
				std::set_difference( m_listeners.begin(), m_listeners.end(), m_willBeRemoved.begin(), m_willBeRemoved.end(), inserter(temp, temp.begin()) );
				m_listeners = temp;
				m_willBeRemoved.clear();
			}

			if (!m_willBeAdded.empty())
			{
				std::set<ListenerType*> temp;
				std::set_union( m_listeners.begin(), m_listeners.end(), m_willBeRemoved.begin(), m_willBeRemoved.end(), inserter(temp, temp.begin()) );
				m_listeners = temp;
				m_willBeAdded.clear();
			}
		}

	private:
		std::set<ListenerType*> m_listeners;
		std::set<ListenerType*> m_willBeAdded;
		std::set<ListenerType*> m_willBeRemoved;
		bool m_bVisitingListener;

        ListenerType* m_keyListener;
	};

};