import React from 'react';
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";

export default class About extends React.Component {
    render() {
        return (
            <Container maxWidth='lg' className='fontFamily:Goldman' >
                <h1 style={{fontFamily:'Goldman'}} >Football</h1>
                <div>
                    <p>Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal.
                        Unqualified, the word football normally means the form of football that is the most popular where the
                        word is used. Sports commonly called football include association football (known as soccer in some countries);
                        gridiron football (specifically American football or Canadian football); </p>
                    <p>Australian rules football;
                        rugby football (either rugby union or rugby league); and Gaelic football. These various forms
                        of football share to varying extent common origins and are known as football codes.</p>

                    <p>There are a number of references to traditional, ancient, or prehistoric ball games played
                        in many different parts of the world.</p>
                    <p>Contemporary codes of football can be traced
                        back to the codification of these games at English public schools during the 19th century.
                        The expansion and cultural influence of the British Empire allowed these rules of football to spread
                        to areas of British influence outside the directly controlled Empire.</p>
                    <p>By the end of the 19th century,
                        distinct regional codes were already developing: Gaelic football, for example, deliberately incorporated
                        the rules of local traditional football games in order to maintain their heritage. In 1888, The Football
                        League was founded in England, becoming the first of many professional football competitions. During
                        the 20th century, several of the various kinds of football grew to become some of the most popular team
                        sports in the world.</p>
                </div>
                <Link to="https://en.wikipedia.org/wiki/Football">More info</Link>
            </Container>
        );
    }
};