import React from 'react'
import Panel from './Panel'
import GrovesNavigator from './GrovesNavigator'
import Menu from './Menu'
import { LoginLink } from './AuthLinks'
import { useAuth } from '../context/auth-context'

const Header = props => {
  const { user } = useAuth();

  if (!process.env.AUTHENTICATION_ENABLED) {
    return (
      <Panel pinSide="left" panelType="nav--no-auth">
        <header>
          <nav>
            <div className="groves-logo-container">
              <svg width="50" height="45" viewBox="0 0 50 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.0361 5.13647C22.2788 5.13647 19.1394 7.76965 18.38 11.2828C14.2178 11.8096 11 15.3466 11 19.6316C11 24.2799 14.7867 28.0481 19.4578 28.0481H21.8855C22.7506 28.0481 23.4518 28.7459 23.4518 29.6067V37.9675C23.4518 38.6131 23.9777 39.1365 24.6265 39.1365C25.2753 39.1365 25.8012 38.6131 25.8012 37.9675V29.6067C25.8012 28.7459 26.5024 28.0481 27.3675 28.0481H29.4036C33.599 28.0481 37 24.6637 37 20.4888C37 17.922 35.7144 15.654 33.749 14.2876C33.8268 13.8466 33.8675 13.3928 33.8675 12.9295C33.8675 8.62555 30.3613 5.13647 26.0361 5.13647ZM20.3407 10.3286C20.1324 10.7794 20.4766 11.2607 20.9674 11.3487C22.8073 11.6786 24.4404 12.6007 25.6604 13.9095C26.7652 13.2857 28.0426 12.9295 29.4036 12.9295C30.2217 12.9295 31.0096 13.0582 31.748 13.2964C32.0139 13.3822 32.3012 13.2077 32.3012 12.9295C32.3012 9.48634 29.4962 6.69509 26.0361 6.69509C23.509 6.69509 21.3312 8.1841 20.3407 10.3286ZM31.266 14.7798C31.652 14.9044 31.8324 15.3343 31.6521 15.6961C31.0379 16.9284 30.0261 17.9298 28.7836 18.5341C28.3355 18.752 27.8437 18.4209 27.7437 17.9347C27.5964 17.2187 27.3578 16.5359 27.0404 15.8988C26.8372 15.4908 26.9727 14.9767 27.4044 14.8258C28.03 14.6071 28.7029 14.4881 29.4036 14.4881C30.0535 14.4881 30.6794 14.5905 31.266 14.7798ZM28.4046 20.3598C28.0879 20.4597 27.8511 20.7284 27.7953 21.0543C27.5708 22.3664 27.0412 23.5749 26.2817 24.6051C26.0111 24.9721 26.0559 25.5013 26.4546 25.7242C27.3265 26.2115 28.3324 26.4895 29.4036 26.4895C32.734 26.4895 35.4337 23.8029 35.4337 20.4888C35.4337 18.9509 34.8524 17.5482 33.8965 16.4863C33.6134 16.172 33.1156 16.2924 32.9121 16.6627C31.9529 18.4085 30.3418 19.7489 28.4046 20.3598ZM26.3066 18.8626C26.3246 19.0239 26.1992 19.164 26.0361 19.164C25.2917 19.164 24.5775 19.0348 23.9151 18.7976C23.7624 18.7429 23.6839 18.5763 23.7397 18.4246C24.0321 17.6306 24.4882 16.9151 25.0675 16.3188C25.2043 16.178 25.4353 16.2105 25.5286 16.3829C25.9364 17.136 26.2069 17.9736 26.3066 18.8626ZM23.5932 20.3359C23.486 20.301 23.3735 20.3766 23.3735 20.4888C23.3735 21.6686 23.7157 22.7689 24.3066 23.6968C24.4646 23.9448 24.8151 23.9558 24.9913 23.7201C25.5949 22.9124 26.0243 21.9679 26.2237 20.9419C26.2461 20.8267 26.1541 20.7226 26.0361 20.7226C25.1831 20.7226 24.3619 20.5869 23.5932 20.3359ZM21.8214 20.0227C21.8399 19.7203 21.7011 19.4279 21.4546 19.25C19.7729 18.0368 18.593 16.1513 18.2847 14.0057C18.2017 13.4275 17.6691 12.981 17.117 13.1794C14.4631 14.133 12.5663 16.6619 12.5663 19.6316C12.5663 23.4191 15.6517 26.4895 19.4578 26.4895C20.6588 26.4895 21.7881 26.1837 22.7713 25.6462C23.1646 25.4312 23.2303 24.9173 22.9894 24.5405C22.2408 23.3694 21.8072 21.9795 21.8072 20.4888C21.8072 20.3323 21.812 20.1769 21.8214 20.0227ZM21.4738 17.2023C21.835 17.5841 22.4455 17.4059 22.693 16.943C22.9923 16.3834 23.3601 15.8657 23.7854 15.4009C24.0875 15.0708 24.111 14.5533 23.7607 14.2744C22.6946 13.4253 21.3695 12.8848 19.9222 12.789C19.8403 12.7836 19.7711 12.8479 19.7711 12.9295C19.7711 14.5831 20.418 16.0864 21.4738 17.2023Z" fill="white"/>
                <path d="M56 53.1366C48.8294 53.1366 54.1738 51.3938 49 48.1366C48.3026 47.8207 41.9551 43.738 41.2869 43.415C38.7039 42.1669 35 39.4477 29 38.6366C22.3074 37.7319 19.2712 38.5571 14.3291 40.6453C13.8678 40.8403 13.4218 41.0736 12.997 41.339C12.3751 41.7277 11.7014 42.1513 11.1934 42.4725L11.192 42.4734C9.44978 43.575 7.90108 44.5543 6.45325 45.3356C4.4413 46.4212 2.69179 47.0845 1 47.1366" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>           
            </div>
          </nav>
        </header>
      </Panel>
    )
  }

  if (user) {
    return (
      <Panel pinSide="center" panelType="nav">
        <header>
          <nav>
            <div className="groves-logo-container">
              <svg width="50" height="45" viewBox="0 0 50 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.0361 5.13647C22.2788 5.13647 19.1394 7.76965 18.38 11.2828C14.2178 11.8096 11 15.3466 11 19.6316C11 24.2799 14.7867 28.0481 19.4578 28.0481H21.8855C22.7506 28.0481 23.4518 28.7459 23.4518 29.6067V37.9675C23.4518 38.6131 23.9777 39.1365 24.6265 39.1365C25.2753 39.1365 25.8012 38.6131 25.8012 37.9675V29.6067C25.8012 28.7459 26.5024 28.0481 27.3675 28.0481H29.4036C33.599 28.0481 37 24.6637 37 20.4888C37 17.922 35.7144 15.654 33.749 14.2876C33.8268 13.8466 33.8675 13.3928 33.8675 12.9295C33.8675 8.62555 30.3613 5.13647 26.0361 5.13647ZM20.3407 10.3286C20.1324 10.7794 20.4766 11.2607 20.9674 11.3487C22.8073 11.6786 24.4404 12.6007 25.6604 13.9095C26.7652 13.2857 28.0426 12.9295 29.4036 12.9295C30.2217 12.9295 31.0096 13.0582 31.748 13.2964C32.0139 13.3822 32.3012 13.2077 32.3012 12.9295C32.3012 9.48634 29.4962 6.69509 26.0361 6.69509C23.509 6.69509 21.3312 8.1841 20.3407 10.3286ZM31.266 14.7798C31.652 14.9044 31.8324 15.3343 31.6521 15.6961C31.0379 16.9284 30.0261 17.9298 28.7836 18.5341C28.3355 18.752 27.8437 18.4209 27.7437 17.9347C27.5964 17.2187 27.3578 16.5359 27.0404 15.8988C26.8372 15.4908 26.9727 14.9767 27.4044 14.8258C28.03 14.6071 28.7029 14.4881 29.4036 14.4881C30.0535 14.4881 30.6794 14.5905 31.266 14.7798ZM28.4046 20.3598C28.0879 20.4597 27.8511 20.7284 27.7953 21.0543C27.5708 22.3664 27.0412 23.5749 26.2817 24.6051C26.0111 24.9721 26.0559 25.5013 26.4546 25.7242C27.3265 26.2115 28.3324 26.4895 29.4036 26.4895C32.734 26.4895 35.4337 23.8029 35.4337 20.4888C35.4337 18.9509 34.8524 17.5482 33.8965 16.4863C33.6134 16.172 33.1156 16.2924 32.9121 16.6627C31.9529 18.4085 30.3418 19.7489 28.4046 20.3598ZM26.3066 18.8626C26.3246 19.0239 26.1992 19.164 26.0361 19.164C25.2917 19.164 24.5775 19.0348 23.9151 18.7976C23.7624 18.7429 23.6839 18.5763 23.7397 18.4246C24.0321 17.6306 24.4882 16.9151 25.0675 16.3188C25.2043 16.178 25.4353 16.2105 25.5286 16.3829C25.9364 17.136 26.2069 17.9736 26.3066 18.8626ZM23.5932 20.3359C23.486 20.301 23.3735 20.3766 23.3735 20.4888C23.3735 21.6686 23.7157 22.7689 24.3066 23.6968C24.4646 23.9448 24.8151 23.9558 24.9913 23.7201C25.5949 22.9124 26.0243 21.9679 26.2237 20.9419C26.2461 20.8267 26.1541 20.7226 26.0361 20.7226C25.1831 20.7226 24.3619 20.5869 23.5932 20.3359ZM21.8214 20.0227C21.8399 19.7203 21.7011 19.4279 21.4546 19.25C19.7729 18.0368 18.593 16.1513 18.2847 14.0057C18.2017 13.4275 17.6691 12.981 17.117 13.1794C14.4631 14.133 12.5663 16.6619 12.5663 19.6316C12.5663 23.4191 15.6517 26.4895 19.4578 26.4895C20.6588 26.4895 21.7881 26.1837 22.7713 25.6462C23.1646 25.4312 23.2303 24.9173 22.9894 24.5405C22.2408 23.3694 21.8072 21.9795 21.8072 20.4888C21.8072 20.3323 21.812 20.1769 21.8214 20.0227ZM21.4738 17.2023C21.835 17.5841 22.4455 17.4059 22.693 16.943C22.9923 16.3834 23.3601 15.8657 23.7854 15.4009C24.0875 15.0708 24.111 14.5533 23.7607 14.2744C22.6946 13.4253 21.3695 12.8848 19.9222 12.789C19.8403 12.7836 19.7711 12.8479 19.7711 12.9295C19.7711 14.5831 20.418 16.0864 21.4738 17.2023Z" fill="white"/>
                <path d="M56 53.1366C48.8294 53.1366 54.1738 51.3938 49 48.1366C48.3026 47.8207 41.9551 43.738 41.2869 43.415C38.7039 42.1669 35 39.4477 29 38.6366C22.3074 37.7319 19.2712 38.5571 14.3291 40.6453C13.8678 40.8403 13.4218 41.0736 12.997 41.339C12.3751 41.7277 11.7014 42.1513 11.1934 42.4725L11.192 42.4734C9.44978 43.575 7.90108 44.5543 6.45325 45.3356C4.4413 46.4212 2.69179 47.0845 1 47.1366" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>           
              <Menu></Menu>
            </div>
            <GrovesNavigator />
          </nav>
        </header>
      </Panel>
    )
  } else {
    return (
      <Panel pinSide="center" panelType="nav">
        <header>
          <nav>
            <div className="groves-logo-container">
              <svg width="50" height="45" viewBox="0 0 50 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.0361 5.13647C22.2788 5.13647 19.1394 7.76965 18.38 11.2828C14.2178 11.8096 11 15.3466 11 19.6316C11 24.2799 14.7867 28.0481 19.4578 28.0481H21.8855C22.7506 28.0481 23.4518 28.7459 23.4518 29.6067V37.9675C23.4518 38.6131 23.9777 39.1365 24.6265 39.1365C25.2753 39.1365 25.8012 38.6131 25.8012 37.9675V29.6067C25.8012 28.7459 26.5024 28.0481 27.3675 28.0481H29.4036C33.599 28.0481 37 24.6637 37 20.4888C37 17.922 35.7144 15.654 33.749 14.2876C33.8268 13.8466 33.8675 13.3928 33.8675 12.9295C33.8675 8.62555 30.3613 5.13647 26.0361 5.13647ZM20.3407 10.3286C20.1324 10.7794 20.4766 11.2607 20.9674 11.3487C22.8073 11.6786 24.4404 12.6007 25.6604 13.9095C26.7652 13.2857 28.0426 12.9295 29.4036 12.9295C30.2217 12.9295 31.0096 13.0582 31.748 13.2964C32.0139 13.3822 32.3012 13.2077 32.3012 12.9295C32.3012 9.48634 29.4962 6.69509 26.0361 6.69509C23.509 6.69509 21.3312 8.1841 20.3407 10.3286ZM31.266 14.7798C31.652 14.9044 31.8324 15.3343 31.6521 15.6961C31.0379 16.9284 30.0261 17.9298 28.7836 18.5341C28.3355 18.752 27.8437 18.4209 27.7437 17.9347C27.5964 17.2187 27.3578 16.5359 27.0404 15.8988C26.8372 15.4908 26.9727 14.9767 27.4044 14.8258C28.03 14.6071 28.7029 14.4881 29.4036 14.4881C30.0535 14.4881 30.6794 14.5905 31.266 14.7798ZM28.4046 20.3598C28.0879 20.4597 27.8511 20.7284 27.7953 21.0543C27.5708 22.3664 27.0412 23.5749 26.2817 24.6051C26.0111 24.9721 26.0559 25.5013 26.4546 25.7242C27.3265 26.2115 28.3324 26.4895 29.4036 26.4895C32.734 26.4895 35.4337 23.8029 35.4337 20.4888C35.4337 18.9509 34.8524 17.5482 33.8965 16.4863C33.6134 16.172 33.1156 16.2924 32.9121 16.6627C31.9529 18.4085 30.3418 19.7489 28.4046 20.3598ZM26.3066 18.8626C26.3246 19.0239 26.1992 19.164 26.0361 19.164C25.2917 19.164 24.5775 19.0348 23.9151 18.7976C23.7624 18.7429 23.6839 18.5763 23.7397 18.4246C24.0321 17.6306 24.4882 16.9151 25.0675 16.3188C25.2043 16.178 25.4353 16.2105 25.5286 16.3829C25.9364 17.136 26.2069 17.9736 26.3066 18.8626ZM23.5932 20.3359C23.486 20.301 23.3735 20.3766 23.3735 20.4888C23.3735 21.6686 23.7157 22.7689 24.3066 23.6968C24.4646 23.9448 24.8151 23.9558 24.9913 23.7201C25.5949 22.9124 26.0243 21.9679 26.2237 20.9419C26.2461 20.8267 26.1541 20.7226 26.0361 20.7226C25.1831 20.7226 24.3619 20.5869 23.5932 20.3359ZM21.8214 20.0227C21.8399 19.7203 21.7011 19.4279 21.4546 19.25C19.7729 18.0368 18.593 16.1513 18.2847 14.0057C18.2017 13.4275 17.6691 12.981 17.117 13.1794C14.4631 14.133 12.5663 16.6619 12.5663 19.6316C12.5663 23.4191 15.6517 26.4895 19.4578 26.4895C20.6588 26.4895 21.7881 26.1837 22.7713 25.6462C23.1646 25.4312 23.2303 24.9173 22.9894 24.5405C22.2408 23.3694 21.8072 21.9795 21.8072 20.4888C21.8072 20.3323 21.812 20.1769 21.8214 20.0227ZM21.4738 17.2023C21.835 17.5841 22.4455 17.4059 22.693 16.943C22.9923 16.3834 23.3601 15.8657 23.7854 15.4009C24.0875 15.0708 24.111 14.5533 23.7607 14.2744C22.6946 13.4253 21.3695 12.8848 19.9222 12.789C19.8403 12.7836 19.7711 12.8479 19.7711 12.9295C19.7711 14.5831 20.418 16.0864 21.4738 17.2023Z" fill="white"/>
                <path d="M56 53.1366C48.8294 53.1366 54.1738 51.3938 49 48.1366C48.3026 47.8207 41.9551 43.738 41.2869 43.415C38.7039 42.1669 35 39.4477 29 38.6366C22.3074 37.7319 19.2712 38.5571 14.3291 40.6453C13.8678 40.8403 13.4218 41.0736 12.997 41.339C12.3751 41.7277 11.7014 42.1513 11.1934 42.4725L11.192 42.4734C9.44978 43.575 7.90108 44.5543 6.45325 45.3356C4.4413 46.4212 2.69179 47.0845 1 47.1366" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>           
            </div>
            {
              process.env.AUTHENTICATION_ENABLED &&
              <ul>
                <li><LoginLink /></li>
              </ul>
            }
          </nav>
        </header>
      </Panel>
    );
  }
}

export default Header

// <a href={`https://are.na/${user.slug}`}><span className="gray">https://www.are.na/</span><strong>{user.slug}/</strong></a>